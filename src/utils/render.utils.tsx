import { FC, ReactElement } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';

function render(
  ui: ReactElement,
  {
    routerOptions = { initialEntries: ['/'] },
    renderOptions,
  }: {
    routerOptions?: MemoryRouterProps;
    renderOptions?: Omit<RenderOptions, 'queries'>;
  } = {}
) {
  const Wrapper: FC = ({ children }) => (
    <MemoryRouter {...routerOptions}>{children}</MemoryRouter>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render };
