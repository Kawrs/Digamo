"use client";

import React from "react";

type CustomBulletProps = {
  index: number;
  children: React.ReactNode;
};

export default function CustomBullet({ index, children }: CustomBulletProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[rgba(247,147,30,0.5)] text-sm font-light">
        {index + 1}
      </div>
      <span>{children}</span>
    </div>
  );
}
