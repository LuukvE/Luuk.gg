import './Gist.scss';
import React, { FC, useState, useEffect } from 'react';

const Gist: FC<{ url: string }> = ({ url }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    const [author, id, file] = url.split('/');

    (window as any)[`gist_callback_${id}`] = (gist: any) => {
      setHtml(gist.div.replace(/href=/g, 'target="_blank" rel="noopener noreferrer" href='));

      if (document.head.innerHTML.indexOf(gist.stylesheet) > -1) return;

      const stylesheet = document.createElement('link');
      stylesheet.type = 'text/css';
      stylesheet.rel = 'stylesheet';
      stylesheet.href = gist.stylesheet;

      document.head.appendChild(stylesheet);
    };

    const script = document.createElement('script');

    script.src = `https://gist.github.com/${author}/${id}.json?callback=gist_callback_${id}&file=${file}`;

    document.head.appendChild(script);
  }, [url]);

  return <div className="Gist" dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export default Gist;
