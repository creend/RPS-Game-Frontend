import { ThreeDots, Watch } from 'react-loader-spinner';
import { HeaderInfo, LoaderWrapper } from './CustomLoader.styles';

interface Props {
  fallbackLoader?: boolean;
}

const CustomLoader: React.FC<Props> = ({ fallbackLoader }) => {
  return (
    <LoaderWrapper>
      {fallbackLoader ? (
        <ThreeDots height={200} width={200} color="#FFFFFF" />
      ) : (
        <>
          <HeaderInfo>Waiting for opponent</HeaderInfo>
          <Watch color="#FFFFFF" height={200} width={200} />
        </>
      )}
    </LoaderWrapper>
  );
};

export default CustomLoader;
