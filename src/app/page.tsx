import Image from "next/image";

import Logo from "../../public/assets/logo.png";

export default function Home() {
  return (
    <main>
      <div>
        <Image src={Logo} alt="Wallet App Logo" />
      </div>
    </main>
  );
}
