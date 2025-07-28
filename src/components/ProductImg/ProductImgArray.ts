export interface ProductImg {
    id: number;
    img: string;
    title: string;
    bgColor: string;
    left?: string;
}

export const productimg: ProductImg[] = [
    {
        id: 1,
        img: "../../../public/Header/protein.png",
        title: "PROTEİN",
        bgColor: "#7EA0A2",
        left: "60%",
    },
    {
        id: 2,
        img: "../../../public/Header/vitamin.png",
        title: "VİTAMİNLER",
        bgColor: "#FDE8D7",
        left: "47%",
    },
    {
        id: 3,
        img: "../../../public/Header/saglik.png",
        title: "SAĞLIK",
        bgColor: "#CCCBC6",
        left: "65%",
    },
    {
        id: 4,
        img: "../../../public/Header/spor-gidalari.png",
        title: "SPOR GIDALARI",
        bgColor: "#D9D8D3",
        left: "36%",
    },
    {
        id: 5,
        img: "../../../public/Header/gıda.png",
        title: "GIDA",
        bgColor: "#72B4CE",
        left: "73%",
    },
    {
        id: 6,
        img: "../../../public/Header/aksesuar.png",
        title: "AKSESUAR",
        bgColor: "#7EA0A2",
        left: "53%",
    }
]