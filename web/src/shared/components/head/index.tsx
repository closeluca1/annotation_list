import { Helmet, HelmetProvider } from "react-helmet-async";

interface MetasProps {
  title: string;
  description: string;
  robots: string;
  news: string;
  google: string;
  url: string;
}

export const Meta = ({
  title,
  description,
  robots,
  news,
  google,
  url,
}: MetasProps) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title} - Lista de tarefas</title>
        <meta name="copyright" content="© Lista de tarefas" />
        <meta name="robots" content={robots} />
        <meta name="googlebot-news" content={news} />
        <meta name="googlebot" content={google} />
        <meta name="googlebot" content="notranslate" />
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary" data-rh="true" />
        <meta name="twitter:title" content={title} data-rh="true" />
        <meta name="twitter:description" content={description} data-rh="true" />
        <meta
          property="og:url"
          content="https://github.com/closeluca1"
          data-rh="true"
        />
        <meta property="og:url" content={`${location.origin}${url}`} />
        <meta
          name="author"
          content="Lista de tarefas (closeluca1) Patrick Lucas Martins"
        />
      </Helmet>
    </HelmetProvider>
  );
};
