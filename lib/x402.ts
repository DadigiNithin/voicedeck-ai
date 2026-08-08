import { NextRequest, NextResponse } from "next/server";
import {
  verifyAlgorandPaymentTx,
  ALGORAND_TREASURY_ADDRESS,
} from "./algorand";

export interface X402Challenge {
  version: string;
  protocol: string;
  network: string;
  amount_algo: number;
  amount_microalgo: number;
  recipient: string;
  currency: string;
  challenge: string;
}

export function createX402PaymentRequiredResponse(
  message: string = "x402 Payment Required: AI endpoint protected by Algorand blockchain payment authorization."
) {
  const challengeData: X402Challenge = {
    version: "1.0",
    protocol: "x402-algorand",
    network: "algorand-testnet",
    amount_algo: 0.1,
    amount_microalgo: 100000,
    recipient: ALGORAND_TREASURY_ADDRESS,
    currency: "ALGO",
    challenge: `tx_req_voicedeck_${Date.now()}`,
  };

  return NextResponse.json(
    {
      status: 402,
      error: "Payment Required",
      message,
      x402: challengeData,
    },
    {
      status: 402,
      headers: {
        "WWW-Authenticate": `x402-algorand realm="VoiceDeck AI API", recipient="${ALGORAND_TREASURY_ADDRESS}", amount="0.1", currency="ALGO"`,
        "X-Payment-Required": "true",
        "X-Payment-Network": "algorand-testnet",
      },
    }
  );
}

export async function checkX402PaymentHeader(req: NextRequest) {
  const txHeader =
    req.headers.get("X-Payment-TxID") ||
    req.headers.get("x-payment-txid") ||
    req.headers.get("x402-txid");

  const authHeader = req.headers.get("authorization") || "";
  let txId = txHeader;

  if (!txId && authHeader.toLowerCase().startsWith("x402 ")) {
    txId = authHeader.substring(5).trim();
  }

  if (!txId) {
    return {
      authenticated: false,
      txId: null,
      response: createX402PaymentRequiredResponse(),
    };
  }

  // Verify transaction on Algorand Blockchain
  const verification = await verifyAlgorandPaymentTx(txId);

  if (!verification.verified) {
    return {
      authenticated: false,
      txId,
      response: NextResponse.json(
        {
          status: 402,
          error: "Payment Authorization Failed",
          message: verification.error || "Algorand payment transaction verification failed.",
        },
        { status: 402 }
      ),
    };
  }

  return {
    authenticated: true,
    txId,
    verification,
    response: null,
  };
}
