import Image from "next/image";
import React from "react";

type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      <Image
        unoptimized={true}
        src={picture}
        alt={name}
        width={42}
        height={42}
        className="w-42 h-42 rounded-full"
      />
      <div className="text-xl font-bold ml-4">{name}</div>
    </div>
  );
};

export default Avatar;
