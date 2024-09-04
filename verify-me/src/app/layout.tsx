import '@/app/globals.css'
import Navbar from '@/components/Navbar';
import { ReactNode } from 'react';



export const metadata = {
    title: "VerifyME",
    description: 'Verify your identification documents'
}

interface RootLayoutProps {
  children: ReactNode;
}

// this layout will be wrapped around everything

const RootLayout = ({ children }: RootLayoutProps) => { 
  return (
    <html lang="en">
        <body>
          <header>
            <Navbar/>
          </header>
          <main>
            {/* <Provider store={store}> */}
            {children}
          {/* </Provider> */}
          </main>
          <footer>
            <div className="container">
                <p>&copy; 2024 Verify Me. All rights reserved.</p>
            </div>
          </footer>
        </body>
    </html>
  )
}

export default RootLayout;