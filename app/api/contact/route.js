import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  const token = process.env.TELEGRAM_BOT_TOKEN; // Move token to .env file
  const chat_id = process.env.TELEGRAM_CHAT_ID; // Move chat ID to .env file

  if (!token || !chat_id) {
    return NextResponse.json(
      { success: false, message: "Missing bot token or chat ID" },
      { status: 400 }
    );
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const message = `New message from ${payload.name}\n\nEmail: ${payload.email}\n\nMessage:\n ${payload.message}\n\n`;

    const res = await axios.post(url, {
      text: message,
      chat_id: chat_id, // Use the correct variable
    });

    if (res.data.ok) {
      return NextResponse.json(
        { success: true, message: "Message sent successfully!" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Telegram API Error:", error?.response?.data || error);
    return NextResponse.json(
      { success: false, message: "Message sending failed!" },
      { status: 500 }
    );
  }
}
