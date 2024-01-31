import React from 'react';
import QRCode from 'react-qr-code';

function ReservationQRCode({ reservation }) {
  const staticText = 'https://localhost:5173/reservation/';
  const qrCodeValue = staticText + reservation.id;

  return (
    <div className="QRCode-item">
      <QRCode value={qrCodeValue} />
    </div>
  );
}

export default ReservationQRCode;