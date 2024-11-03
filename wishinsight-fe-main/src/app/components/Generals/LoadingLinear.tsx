import Image from "next/image";

interface LoadingProps {
  width: number;
  height: number;
}

const LoadingLinear = ({ width, height }: LoadingProps) => {
  return (
    <>
      <Image
        src="/loadingLinear.svg"
        width={width}
        height={height}
        alt="wishinsight-loading"
      />
    </>
  );
};

export default LoadingLinear;
