import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    
    <div className="mt-20">
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
          Better every day
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
          Let's change it up a bit
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nobis in
          error repellat voluptatibus ad.
        </p>
        <Link to="/register" className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95">
          Get Started
        </Link>
      </div>
      <ShuffleGrid />
    </section>
    </div>
    
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://i.ebayimg.com/images/g/XYAAAOSwBC1me4Du/s-l1600.jpg",
  },
  {
    id: 2,
    src: "https://m.media-amazon.com/images/I/71UDerN2+DL._AC_UF350,350_QL80_.jpg",
  },
  {
    id: 3,
    src: "https://www.tradeinn.com/f/13936/139366306_4/lenovo-thinkpad-z16-16-ryzen-7-pro-6850h-16gb-512gb-ssd-laptop.webp",
  },
  {
    id: 4,
    src: "https://itfix.org.uk/wp-content/uploads/2024/05/The_Truth_About_PC_Optimization_Software.webp",
  },
  {
    id: 5,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU-6oIzMMJt7uirpqz4mQU86dhq5EC0gtkoA&s",
  },
  {
    id: 6,
    src: "https://global.discourse-cdn.com/spiceworks/original/4X/b/e/3/be3790bdb22e742495d753ead3453da41ac01f9c.png",
  },
  {
    id: 7,
    src: "https://i.ytimg.com/vi/Ws6eeU5QxUk/mqdefault.jpg",
  },
  {
    id: 8,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx1Jy3q3hGSefg3KubdHKOWs7d6lP9tbZ7-A&s",
  },
  {
    id: 9,
    src: "https://www.cnet.com/a/img/resize/0a41848529daa5c3cddf6d2b3146895fee2c1e9a/hub/2011/11/08/c79fc16c-f0f0-11e2-8c7c-d4ae52e62bcc/WinVista-Button_rgb_sm.jpg?auto=webp&fit=crop&height=1200&width=1200",
  },
  {
    id: 10,
    src: "https://droix.net/knowledge-base/wp-content/uploads/2022/07/windows_11_generic_hero_1-1600x898.webp",
  },
  {
    id: 11,
    src: "https://www-konga-com-res.cloudinary.com/w_400,f_auto,fl_lossy,dpr_3.0,q_auto/media/catalog/product/D/P/213537_1678013552.jpg",
  },
  {
    id: 12,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKnJMywC6e8epZbJ81jHchqY7Zycdk-YC1jQ&s",
  },
  {
    id: 13,
    src: "https://ophtek.com/wp-content/uploads/2020/11/fixprinter.jpg",
  },
  {
    id: 14,
    src: "https://techsupportdubai.com/wp-content/uploads/2019/01/Printer-Repair-Service-Center.png",
  },
  {
    id: 15,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzG145UTZ6toERW-6-xvkOCJTiGcpr7gcZTg&s",
  },
  {
    id: 16,
    src: "https://customany.com/wp-content/uploads/2023/12/Fix-the-Drum-error-by-replacing-Drum-for-Brother-Printer.jpg",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        borderRadius: "50%",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default Hero;


