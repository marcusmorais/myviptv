import React from 'react';
import { useRouter } from 'next/router';

export default function PlayerPage() {
  const router = useRouter();
  const { channelId } = router.query;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Playing Channel: {channelId}</h1>
    </div>
  );
}
