import "./globals.css";
import ReactQueryProvider from "./react-query/ReactQueryProvider";


  export const metadata = {
    title: "NETFLIX",
    description: "Netflix is a global streaming service offering a wide selection of movies, TV shows, series, and original content. Subscribers can enjoy unlimited entertainment anytime, anywhere, without ads, with a monthly subscription.",
    icons: {
      icon: "/favicon.ico", 
    },
  };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>

      </body>
    </html>
  );
}
