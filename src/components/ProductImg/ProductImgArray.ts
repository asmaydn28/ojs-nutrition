export interface ProductImg {
    id: number;
    img: string;
    title: string;
    bgColor: string;
}

export const productimg: ProductImg[] = [
    {
        id: 1,
        img: "/ProductImage/protein.png",
        title: "PROTEİN",
        bgColor: "#7EA0A2",
    },
    {
        id: 2,
        img: "/ProductImage/vitamin.png",
        title: "VİTAMİNLER",
        bgColor: "#FDE8D7",
    },
    {
        id: 3,
        img: "/ProductImage/saglik.png",
        title: "SAĞLIK",
        bgColor: "#CCCBC6",
    },
    {
        id: 4,
        img: "/ProductImage/spor-gidalari.png",
        title: "SPOR GIDALARI",
        bgColor: "#D9D8D3",
    },
    {
        id: 5,
        img: "/ProductImage/gıda.png",
        title: "GIDA",
        bgColor: "#72B4CE",
    },
    {
        id: 6,
        img: "/ProductImage/aksesuar.png",
        title: "AKSESUAR",
        bgColor: "#7EA0A2",
    }
]