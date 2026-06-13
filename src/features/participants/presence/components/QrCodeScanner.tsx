'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import jsQR from 'jsqr';
import { colorTokens } from '@/lib/colors';

interface QrCodeScannerProps {
  onResult?: (value: string) => void;
  scanKey?: number;
  paused?: boolean;
}

export function QrCodeScanner({
  onResult,
  scanKey = 0,
  paused = false,
}: QrCodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanTimerRef = useRef<number | null>(null);
  const successTimerRef = useRef<number | null>(null);
  const lastScannedRef = useRef<{ value: string; timestamp: number } | null>(null);
  const onResultRef = useRef(onResult);
  const pausedRef = useRef(paused);

  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const [status, setStatus] = useState<'loading' | 'ready' | 'error' | 'success'>('loading');
  const [message, setMessage] = useState('Inicializando câmera...');

  useEffect(() => {
    lastScannedRef.current = null;
  }, [scanKey]);

  useEffect(() => {
    let mounted = true;

    const stopCamera = () => {
      if (scanTimerRef.current) window.clearTimeout(scanTimerRef.current);
      if (successTimerRef.current) window.clearTimeout(successTimerRef.current);
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };

    const scanFrame = () => {
      if (!mounted) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas || !video.videoWidth) {
        scanTimerRef.current = window.setTimeout(scanFrame, 100);
        return;
      }

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        scanTimerRef.current = window.setTimeout(scanFrame, 100);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code?.data && !pausedRef.current) {
        const now = Date.now();
        if (!lastScannedRef.current || now - lastScannedRef.current.timestamp > 2000) {
          lastScannedRef.current = { value: code.data, timestamp: now };
          setStatus('success');
          onResultRef.current?.(code.data);

          if (successTimerRef.current) window.clearTimeout(successTimerRef.current);
          successTimerRef.current = window.setTimeout(() => {
            if (mounted) setStatus('ready');
          }, 1500);
        }
      }

      scanTimerRef.current = window.setTimeout(scanFrame, 100);
    };

    const initScanner = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setStatus('error');
        setMessage('Seu navegador não suporta câmera');
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });

        if (!mounted || !videoRef.current) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        setStatus('ready');
        setMessage('Aponte a câmera para o QR Code');
        scanFrame();
      } catch {
        setStatus('error');
        setMessage('Permita o acesso à câmera e recarregue a página');
      }
    };

    void initScanner();

    return () => {
      mounted = false;
      stopCamera();
    };
  }, []);

  const isLoading = status === 'loading';
  const hasError = status === 'error';
  const isSuccess = status === 'success';

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 380,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          aspectRatio: '1',
          borderRadius: 3,
          overflow: 'hidden',
          bgcolor: colorTokens.surface.background,
          border: `2px solid ${isSuccess ? colorTokens.status.success : colorTokens.neutral.border}`,
          position: 'relative',
        }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: isLoading || hasError ? 'none' : 'block',
          }}
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {!isLoading && !hasError && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: '70%',
                aspectRatio: '1',
                border: `2px solid ${isSuccess ? colorTokens.status.success : colorTokens.neutral.border}`,
                borderRadius: 2,
                opacity: isSuccess ? 0.9 : 0.3,
              }}
            />

            {isSuccess && (
              <CheckCircleRoundedIcon
                sx={{
                  position: 'absolute',
                  fontSize: 64,
                  color: colorTokens.status.success,
                }}
              />
            )}
          </Box>
        )}

        {(isLoading || hasError) && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isLoading && <CircularProgress color="secondary" size={32} />}
            {hasError && (
              <QrCodeScannerRoundedIcon sx={{ fontSize: 48, color: colorTokens.neutral.gray500 }} />
            )}
          </Box>
        )}
      </Box>

      <Typography
        sx={{
          fontSize: 14,
          color: isSuccess ? colorTokens.status.success : colorTokens.text.primary,
          textAlign: 'center',
          fontWeight: isSuccess ? 700 : 400,
        }}
      >
        {isSuccess ? 'QR Code detectado' : message}
      </Typography>
    </Box>
  );
}
