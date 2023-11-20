import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import { Loader } from '@/components';
import { router } from '@/templates/router';
import { store } from '@/store/store.ts';

const App = () => {
  return (
    <Provider store={store}>
      <Toaster position="bottom-right" reverseOrder toastOptions={{ duration: 4000 }} />
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  );
};

export default App;
