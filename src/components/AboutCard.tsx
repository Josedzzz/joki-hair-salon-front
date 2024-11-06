export default function AboutCard() {
  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-2 slide-in-left">
      <div className="w-full max-w-md bg-custom-white p-8 shadow-lg rounded-lg transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center space-x-1 gap-3 mb-2">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-custom-silver">
            About Us
          </h1>
          <i className="fa-solid fa-users text-xl sm:text-3xl md:text-4xl text-custom-silver"></i>
        </div>
        <p className="text-base text-custom-dark mb-4 text-justify">
          Joki Hair Salon is a top-tier salon and barbershop offering premium
          hair services along with a curated selection of hair care products. We
          pride ourselves on delivering a luxurious and personalized experience
          for every client.
        </p>
        <p className="text-base text-custom-dark mb-4 text-justify">
          Our salon combines modern techniques with high-quality products to
          meet the styling needs of both men and women. Whether you're looking
          for a fresh haircut, a beard trim, or professional hair care advice,
          Joki Hair Salon is here to elevate your look.
        </p>
        <p className="text-base text-custom-dark text-justify">
          At Joki Hair Salon, our mission is to provide top-notch hair care
          while also offering a variety of hair products, all within an inviting
          and trendy environment. We strive to create lasting connections with
          our clients through excellent service and expertise.
        </p>
      </div>
    </main>
  );
}
