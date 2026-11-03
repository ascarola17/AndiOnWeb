import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import LazyImage from './LazyImage';

test('cached photos stay visible without waiting for another load event', () => {
  const complete = jest.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true);
  const width = jest.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(640);
  try {
    render(<LazyImage src="/original.jpg" webpSrc="/optimized.webp" alt="Cached photo" />);
    expect(screen.getByAltText('Cached photo')).toBeVisible();
  } finally {
    complete.mockRestore();
    width.mockRestore();
  }
});

test('a missing optimized photo falls back to its original and the next photo can load normally', () => {
  const { rerender } = render(<LazyImage src="/original-a.jpg" webpSrc="/a.webp" alt="Personal photo" />);
  const photo = screen.getByAltText('Personal photo');
  fireEvent.error(photo);
  expect(photo).toHaveAttribute('src', '/original-a.jpg');
  expect(photo).toBeVisible();
  rerender(<LazyImage src="/original-b.jpg" webpSrc="/b.webp" alt="Personal photo" />);
  expect(photo).toHaveAttribute('src', '/b.webp');
  fireEvent.load(photo);
  expect(photo).toBeVisible();
});
