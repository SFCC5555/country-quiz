// Component that displays an external link with a specific description.
const ExternalLink = () => {
  return (
    <p className="text-sm light-text">
      Challenge by{" "}
      <a
        href="https://devchallenges.io/challenges/Bu3G2irnaXmfwQ8sZkw8"
        target="_blank"
        rel="noreferrer"
        className="cursor-pointer opacity-75 hover:opacity-100 hover:underline"
      >
        devChallenges.io
      </a>
    </p>
  );
};

export {ExternalLink};