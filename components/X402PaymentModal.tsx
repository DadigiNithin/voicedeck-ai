"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  CheckCircle2,
  Lock,
  ArrowRight,
  X,
  ExternalLink,
  Loader2,
  Wallet,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import algosdk from "algosdk";
import { useWallet, WalletId } from "@txnlab/use-wallet-react";
import { ALGORAND_TREASURY_ADDRESS, verifyAlgorandPaymentTx } from "@/lib/algorand";

export type PaymentState =
  | "IDLE"
  | "CONNECTING_WALLET"
  | "WALLET_CONNECTED"
  | "PAYMENT_REQUIRED"
  | "OPENING_PERA"
  | "WAITING_FOR_SIGNATURE"
  | "TRANSACTION_SUBMITTED"
  | "VERIFYING_PAYMENT"
  | "PAYMENT_CONFIRMED"
  | "GENERATING_SLIDES"
  | "SUCCESS"
  | "ERROR";

interface X402PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (txId: string) => void;
  requiredAmountAlgo?: number;
  requiredAmountMicroAlgo?: number;
  recipientAddress?: string;
}

export default function X402PaymentModal({
  isOpen,
  onClose,
  onPaymentSuccess,
  requiredAmountAlgo = 0.1,
  requiredAmountMicroAlgo = 100000,
  recipientAddress = ALGORAND_TREASURY_ADDRESS,
}: X402PaymentModalProps) {
  const { activeAddress, wallets, signTransactions } = useWallet();
  const peraWallet = wallets.find((w) => w.id === WalletId.PERA);

  const [paymentState, setPaymentState] = useState<PaymentState>("PAYMENT_REQUIRED");
  const [txId, setTxId] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const isUserCancelError = (err: any) => {
    return (
      err?.message?.includes("closed by user") ||
      err?.message?.includes("modal is closed") ||
      err?.message?.includes("rejected") ||
      err?.message?.includes("cancelled") ||
      err?.name === "PeraWalletConnectError"
    );
  };

  const handleConnectWallet = async () => {
    try {
      setErrorMessage(null);
      setPaymentState("CONNECTING_WALLET");
      setStatusMessage("Connecting to Pera Wallet…");

      if (!peraWallet) {
        throw new Error("Pera Wallet provider is not available.");
      }

      await peraWallet.connect();
      setPaymentState("WALLET_CONNECTED");
      setStatusMessage("Pera Wallet connected! Ready to pay.");
    } catch (err: any) {
      if (isUserCancelError(err)) {
        console.log("[PeraWallet] Connect modal closed by user.");
        setPaymentState("PAYMENT_REQUIRED");
        setStatusMessage("");
        return;
      }
      console.error("Wallet connection error:", err);
      setPaymentState("ERROR");
      setErrorMessage(err.message || "Failed to connect Pera Wallet.");
    }
  };

  const handlePayWithPera = async () => {
    setErrorMessage(null);
    try {
      let currentSender = activeAddress;

      // 1. Ensure wallet is connected
      if (!currentSender) {
        setPaymentState("CONNECTING_WALLET");
        setStatusMessage("Connecting Pera Wallet…");
        if (!peraWallet) throw new Error("Pera Wallet is not available.");

        let accounts;
        try {
          accounts = await peraWallet.connect();
        } catch (connErr: any) {
          if (isUserCancelError(connErr)) {
            console.log("[PeraWallet] Connect modal closed by user during payment.");
            setPaymentState("PAYMENT_REQUIRED");
            setStatusMessage("");
            return;
          }
          throw connErr;
        }

        if (!accounts || accounts.length === 0) {
          throw new Error("No Algorand account connected.");
        }
        currentSender = accounts[0].address;
      }

      // 2. Build Algorand TestNet transaction
      setPaymentState("OPENING_PERA");
      setStatusMessage("Fetching Algorand TestNet parameters…");

      const algodClient = new algosdk.Algodv2("", "https://testnet-api.algonode.cloud", "");
      const params = await algodClient.getTransactionParams().do();

      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        sender: currentSender,
        receiver: recipientAddress,
        amount: requiredAmountMicroAlgo,
        suggestedParams: params,
        note: new TextEncoder().encode(`VoiceDeck AI x402 Payment: ${Date.now()}`),
      });

      // 3. Request user signature in Pera Wallet
      setPaymentState("WAITING_FOR_SIGNATURE");
      setStatusMessage("Please approve 0.1 ALGO payment in Pera Wallet app…");

      const encodedTxn = txn.toByte();
      let signedResult;
      try {
        signedResult = await signTransactions([encodedTxn]);
      } catch (signErr: any) {
        if (isUserCancelError(signErr)) {
          console.log("[PeraWallet] Transaction signature cancelled by user.");
          setPaymentState("PAYMENT_REQUIRED");
          setErrorMessage("Transaction signing was cancelled in Pera Wallet.");
          return;
        }
        throw signErr;
      }

      if (!signedResult || signedResult.length === 0 || !signedResult[0]) {
        throw new Error("Transaction signature was rejected in Pera Wallet.");
      }

      const signedTxnBytes = signedResult[0];

      // 4. Submit transaction to Algorand TestNet
      setPaymentState("TRANSACTION_SUBMITTED");
      setStatusMessage("Submitting transaction to Algorand TestNet…");

      const sendResponse = await algodClient.sendRawTransaction(signedTxnBytes).do();
      const confirmedTxId = sendResponse.txid;
      setTxId(confirmedTxId);

      // 5. Verify on Algorand Indexer
      setPaymentState("VERIFYING_PAYMENT");
      setStatusMessage(`Transaction submitted (${confirmedTxId.substring(0, 8)}…). Verifying on-chain…`);

      const verification = await verifyAlgorandPaymentTx(confirmedTxId, requiredAmountMicroAlgo);

      if (!verification.verified) {
        throw new Error(verification.error || "On-chain transaction verification failed.");
      }

      // 6. Confirmed & Success
      setPaymentState("PAYMENT_CONFIRMED");
      setStatusMessage("Payment Confirmed ✓ (Algorand TestNet)");

      setTimeout(() => {
        setPaymentState("SUCCESS");
        onPaymentSuccess(confirmedTxId);
      }, 1500);
    } catch (err: any) {
      console.error("Pera Payment error:", err);
      setPaymentState("ERROR");
      setErrorMessage(
        err.message || "Payment execution failed. Please check your Pera Wallet & TestNet balance."
      );
    }
  };

  const getExplorerUrl = (tx: string) => `https://lora.algokit.io/testnet/transaction/${tx}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg bg-[#0d0d18] border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Top Gradient Banner */}
          <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400" />

          <div className="p-6 sm:p-8">
            {/* Header Title */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shadow-lg">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">
                    VoiceDeck AI — x402 Protocol
                  </h3>
                  <p className="text-gray-400 text-xs">Algorand TestNet Payment Required</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* HTTP 402 Banner */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-yellow-400 font-bold">HTTP/1.1 402 Payment Required</span>
                <span className="text-purple-300 font-semibold px-2 py-0.5 rounded bg-purple-500/20">
                  Algorand TestNet
                </span>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">
                This endpoint is protected by the{" "}
                <span className="text-white font-semibold">x402 payment authorization</span>.
                Complete a real {requiredAmountAlgo} ALGO micropayment via Pera Wallet to generate
                slides.
              </p>
            </div>

            {/* Payment Parameter Box */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-xs text-gray-300 space-y-2.5 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Network:</span>
                <span className="text-blue-400 font-bold">Algorand TestNet</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Asset / Amount:</span>
                <span className="text-green-400 font-bold">
                  {requiredAmountAlgo} ALGO ({requiredAmountMicroAlgo.toLocaleString()} microAlgos)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Receiver:</span>
                <span
                  className="text-purple-300 font-mono text-[11px] truncate max-w-[210px]"
                  title={recipientAddress}
                >
                  {recipientAddress.substring(0, 8)}...
                  {recipientAddress.substring(recipientAddress.length - 8)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-white/10">
                <span className="text-gray-400">Connected Wallet:</span>
                {activeAddress ? (
                  <span className="text-green-300 font-mono text-[11px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    {activeAddress.substring(0, 6)}...
                    {activeAddress.substring(activeAddress.length - 4)}
                  </span>
                ) : (
                  <span className="text-yellow-400 text-[11px]">Not Connected</span>
                )}
              </div>
            </div>

            {/* Live State Status Indicator */}
            {statusMessage && (
              <div
                className={`flex items-center gap-2 px-4 py-3 rounded-xl mb-6 text-xs font-medium border ${
                  paymentState === "PAYMENT_CONFIRMED" || paymentState === "SUCCESS"
                    ? "bg-green-500/10 border-green-500/30 text-green-300"
                    : paymentState === "ERROR"
                    ? "bg-red-500/10 border-red-500/30 text-red-300"
                    : "bg-purple-500/10 border-purple-500/30 text-purple-300"
                }`}
              >
                {paymentState === "PAYMENT_CONFIRMED" || paymentState === "SUCCESS" ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                ) : paymentState === "ERROR" ? (
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                ) : (
                  <Loader2 className="w-4 h-4 animate-spin text-purple-400 flex-shrink-0" />
                )}
                <span className="flex-1">{statusMessage}</span>
              </div>
            )}

            {/* Error Message Box */}
            {errorMessage && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-6 text-xs text-red-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 leading-relaxed">{errorMessage}</div>
              </div>
            )}

            {/* Transaction Confirmed Box */}
            {txId && (paymentState === "PAYMENT_CONFIRMED" || paymentState === "SUCCESS") && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6 space-y-2">
                <div className="text-green-400 font-bold text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Payment Confirmed ✓
                </div>
                <div className="text-gray-300 text-xs font-mono">
                  TxID: <span className="text-white">{txId}</span>
                </div>
                <a
                  href={getExplorerUrl(txId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-purple-200 underline mt-1"
                >
                  View on Algorand Explorer <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              {!activeAddress && paymentState !== "CONNECTING_WALLET" && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConnectWallet}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
                >
                  <Wallet className="w-4 h-4" />
                  Connect Pera Wallet
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePayWithPera}
                disabled={
                  paymentState === "CONNECTING_WALLET" ||
                  paymentState === "OPENING_PERA" ||
                  paymentState === "WAITING_FOR_SIGNATURE" ||
                  paymentState === "TRANSACTION_SUBMITTED" ||
                  paymentState === "VERIFYING_PAYMENT" ||
                  paymentState === "PAYMENT_CONFIRMED" ||
                  paymentState === "SUCCESS"
                }
                className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-50 cursor-pointer"
              >
                {paymentState === "WAITING_FOR_SIGNATURE" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Check Pera Wallet to Sign…
                  </>
                ) : paymentState === "VERIFYING_PAYMENT" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Verifying On-Chain…
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4" />
                    Pay {requiredAmountAlgo} ALGO with Pera Wallet
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>

              {paymentState === "ERROR" && (
                <button
                  onClick={handlePayWithPera}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Retry Payment
                </button>
              )}

              <div className="text-center text-[11px] text-gray-500 flex items-center justify-center gap-1.5 mt-1">
                <Lock className="w-3 h-3 text-gray-400" />
                Protected by x402 Payment Authorization Standard
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
