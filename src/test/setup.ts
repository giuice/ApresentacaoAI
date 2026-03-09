import '@testing-library/jest-dom';
import { vi } from 'vitest';

const mockCanvasContext = {
	fillStyle: '',
	font: '',
	fillRect: vi.fn(),
	fillText: vi.fn(),
	setTransform: vi.fn(),
};

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	configurable: true,
	value: vi.fn().mockImplementation((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(mockCanvasContext) as unknown as typeof HTMLCanvasElement.prototype.getContext;

// Mock IntersectionObserver for framer-motion whileInView
class MockIntersectionObserver implements IntersectionObserver {
	readonly root: Element | null = null;
	readonly rootMargin: string = '';
	readonly thresholds: ReadonlyArray<number> = [];
	constructor(private callback: IntersectionObserverCallback) {}
	observe(target: Element) {
		// Immediately report as intersecting so whileInView animations trigger
		this.callback(
			[{ isIntersecting: true, target, intersectionRatio: 1 } as IntersectionObserverEntry],
			this,
		);
	}
	unobserve = vi.fn();
	disconnect = vi.fn();
	takeRecords = vi.fn().mockReturnValue([]);
}

Object.defineProperty(window, 'IntersectionObserver', {
	writable: true,
	configurable: true,
	value: MockIntersectionObserver,
});

Object.defineProperty(globalThis, 'IntersectionObserver', {
	writable: true,
	configurable: true,
	value: MockIntersectionObserver,
});
