import axios from 'axios';
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  const token = '7436197427:AAGQoE8-utX2zDrRJvBO_w-5ziAXW1DZC2Y';
  const chat_id = '-4166994678';

  if (!token || !chat_id) {
    return NextResponse.json({
      success: false,
    }, { status: 200 });
  };

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const message = `New message from ${payload.name}\n\nEmail: ${payload.email}\n\nMessage:\n ${payload.message}\n\n`;

    const res = await axios.post(url, {
      text: message,
      chat_id: process.env.TELEGRAM_CHAT_ID
    });

    if (res.data.ok) {
      return NextResponse.json({
        success: true,
        message: "Message sent successfully!",
      }, { status: 200 });
    };
  } catch (error) {
    console.log(error.response.data)
    return NextResponse.json({
      message: "Message sending failed!",
      success: false,
    }, { status: 500 });
  }
};