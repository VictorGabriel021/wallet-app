import { LoadingContainer } from "./styles";

import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <LoadingContainer>
      <CircularProgress />
    </LoadingContainer>
  );
};

export default Loading;
