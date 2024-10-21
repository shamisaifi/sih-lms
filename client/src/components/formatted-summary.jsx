import React from 'react';

export const FormattedSummary = ({ summary }) => {
  const formatText = (text) => {
    return text
      .split('¶¶')
      .map((paragraph, index) => (
        <React.Fragment key={index}>
          {paragraph.split('\n').map((line, lineIndex) => {
            if (line.startsWith('##')) {
              return <h2 key={lineIndex} className="text-2xl font-bold mt-4 mb-2">{line.slice(2).trim()}</h2>;
            } else if (line.startsWith('@@')) {
              return <h3 key={lineIndex} className="text-xl font-semibold mt-3 mb-1">{line.slice(2).trim()}</h3>;
            } else if (line.startsWith('••')) {
              return <li key={lineIndex} className="ml-6 list-disc">{line.slice(2).trim()}</li>;
            } else {
              return (
                (<p key={lineIndex} className="mb-2">
                  {line.split('!!').map((segment, segIndex) => (
                    segIndex % 2 === 0 ? (
                      segment
                    ) : (
                      <strong key={segIndex} className="font-bold text-primary">{segment}</strong>
                    )
                  ))}
                </p>)
              );
            }
          })}
          {index < text.split('¶¶').length - 1 && <br />}
        </React.Fragment>
      ));
  };

  return (
    (<div className="formatted-summary">
      {formatText(summary)}
    </div>)
  );
};