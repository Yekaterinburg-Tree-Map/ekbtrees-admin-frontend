import 'semantic-ui-css/semantic.min.css'
import AdminLayout from '@/components/AdminLayout'

import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {

  return (
    <AdminLayout>
      <Component {...pageProps} />
    </AdminLayout>
  )
}
