import Footer from "@/components/Footer/Footer"
import Comments from "@/components/Comments/Comments"

function AboutUs() {
  return (
    <>
      <div className="mt-40 md:mt-50 max-w-[1200px] mx-auto px-5 text-left">

        <div className="mb-10">
            <h1 className="font-bold text-3xl mb-3">
            Sağlıklı ve Fit Yaşamayı Zevkli ve Kolay Hale Getirmek İçin Varız
            </h1>
            <p className="font-normal text-sm/6 mb-3">
                2016 yılından beri sporcu gıdaları, takviye edici gıdalar ve fonksiyonel gıdaları üreten bir firma olarak; müşterilerimize en kaliteli, lezzetli, tüketilmesi kolay ürünleri sunuyoruz.
            </p>
            <p className="font-normal text-sm/6 mb-3">
                Müşteri memnuniyeti ve sağlığı her zaman önceliğimiz olmuştur. Ürünlerimizde, yüksek kalite standartlarına bağlı olarak, sporcuların ve sağlıklı yaşam tutkunlarının ihtiyaçlarına yönelik
                besleyici çözümler sunuyoruz. Ürün yelpazemizdeki protein tozları, aminoasitler, vitamin ve mineral takviyeleri ile spor performansınızı desteklemek için ideal besin değerlerini sunuyoruz.
            </p>
            <p className="font-normal text-sm/6 mb-3">
                Sizin için sadece en iyisinin yeterli olduğunu biliyoruz. Bu nedenle, inovasyon, kalite, sağlık ve güvenlik ilkelerimizi korurken, sürekli olarak ürünlerimizi geliştirmeye ve yenilikçi beslenme
                çözümleri sunmaya devam ediyoruz.
            </p>
            <p className="font-normal text-sm/6 mb-3">
                Sporcu gıdaları konusunda lider bir marka olarak, sizin sağlığınıza ve performansınıza değer veriyoruz. Siz de spor performansınızı en üst seviyeye çıkarmak ve sağlıklı yaşam tarzınızı desteklemek
            </p>
            <p className="font-normal text-sm/6 mb-3">
                istiyorsanız, bize katılın ve en besleyici çözümlerimizle tanışın. Sağlıklı ve aktif bir yaşam için biz her zaman yanınızdayız.
            </p>

            <h2 className="font-bold text-3xl mb-3">
                1.000.000+ den Fazla Mutlu Müşteri
            </h2>
            <p className="font-normal text-sm-6 mb-15">
                Sanatçılardan profesyonel sporculara, doktordan öğrencilere hayatın her alanında sağlıklı yaşamı ve beslenmeyi hedefleyen 1.000.000'den fazla kişiye ulaştık.
            </p>

            <h2 className="font-bold text-3xl mb-5">
                Sertifikalarımız
            </h2>
            <div className="grid sm:grid-cols-6 grid-cols-3 max-w-[640px] gap-4">
                <img src="/AboutUs/iso.png" alt="iso1" className="sm:w-full" />
                <img src="/AboutUs/helal.png" alt="helal" className="sm:w-full" />
                <img src="/AboutUs/iso2.png" alt="iso2" className="sm:w-full" />
                <img src="/AboutUs/gmp.png" alt="gmp" className="sm:w-full" />
                <img src="/AboutUs/iso3.png" alt="iso3" className="sm:w-full" />
                <img src="/AboutUs/ghp.png" alt="ghp" className="sm:w-full" />
            </div>
        </div>

        <div>
            <div className="mb-10">
                <div className="flex py-3 mb-5 items-center border-t-2 border-b-2">
                    {[...Array(5)].map((_, i) => (
                        <svg
                        key={i}
                        width="26.95"
                        height="25.66"
                        viewBox="0 0 24 24"
                        fill="none"
                        >
                        <path
                            d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9L8.91 8.26L12 2Z"
                            fill={i < 5 ? "#FDD835" : "#E0E0E0"}
                        />
                        </svg>
                    ))}
                    <span className="text-[#1F23AA] font-normal text-[13px]">196900 Yorum</span>
                </div>
                <div>
                    <div className="bg-gradient-to-r from-[#387EC7] to-[#1F23AA] rounded-[25px] text-white flex justify-center items-center font-bold w-[174px] h-[47px] text-[13px]">
                        ÜRÜN İNCELEMELERİ
                    </div>
                </div>
            </div>
            <div>
                <Comments variant="aboutus" />
            </div>
        </div>
        
      </div>

      <Footer/>
    </>
  )
}

export default AboutUs
