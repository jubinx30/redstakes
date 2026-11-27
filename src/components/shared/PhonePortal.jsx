import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';

/**
 * PhonePortal renders children directly into the root phone screen container (#phone-screen-root).
 * This ensures modals and full-screen overlays are positioned relative to the iPhone screen
 * rather than any scrolled <main> container, preventing viewport offset and clipping issues.
 */
export default function PhonePortal({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const root = document.getElementById('phone-screen-root') || document.body;
  return createPortal(children, root);
}
