import Image from "next/image";

interface LoadingProps {
  width: number;
  height: number;
}

const LoadingCircular = ({ width, height }: LoadingProps) => {
  return (
    <>
      <Image
        src="/loading.svg"
        width={width}
        height={height}
        alt="wishinsight-loading"
      />
    </>
  );
};

export default LoadingCircular;
