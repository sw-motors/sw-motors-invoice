export const LoopSelect = [
    { value: 'SW9_Low', name: 'SW9(LOW)', price: 0},
    { value: 'StandardEdge', name: '스탠다드 엣지', price: 9900000 },
    { value: 'SignatureMolding', name: '시그니처 몰딩', price: 11000000 }
];

export const PackageSelect = {
    SW9_Low: [
        { value: 'Family', name: '패밀리카 패키지', price: 5500000, image: `/sw-motors-invoice/image/family.png` },
        { value: 'Daily', name: '데일리카 패키지', price: 4200000, image: '/sw-motors-invoice/image/daily.png' },
        { value: 'LimousineMerge', name: '리무진 통합 패키지 (9인승)', price: 6400000 , image: '/sw-motors-invoice/image/limousineMerge.png' }
    ],
    StandardEdge: [
        { value: 'Premium6', name: '프리미엄 차박 패키지 (6인승)', price: 13000000, image: '/sw-motors-invoice/image/premium6.png' },
        { value: 'Semi', name: '세미 의전 차박 패키지 (6인승)', price: 16000000, image: '/sw-motors-invoice/image/semi.png' },
        { value: 'LimousineColor', name: '리무진 컬러 패키지 (9인승)', price: 6000000, image: '/sw-motors-invoice/image/limousineColor.png' },
        { value: 'LimousineMerge', name: '리무진 통합 패키지 (9인승)', price: 6400000, image: '/sw-motors-invoice/image/limousineMerge.png' }
    ],
    SignatureMolding: [
        { value: 'TheH', name: '더에이치 패키지', price: 13780000, image: '/sw-motors-invoice/image/theh.png' },
        { value: 'Premium6', name: '프리미엄 차박 패키지 (6인승)', price: 13000000, image: '/sw-motors-invoice/image/premium6.png' },
        { value: 'Semi', name: '세미 의전 차박 패키지 (6인승)', price: 16000000, image: '/sw-motors-invoice/image/semi.png' },
        { value: 'LimousineColor', name: '리무진 컬러 패키지 (9인승)', price: 6000000, image: '/sw-motors-invoice/image/limousineColor.png' },
        { value: 'LimousineMerge', name: '리무진 통합 패키지 (9인승)', price: 6400000, image: '/sw-motors-invoice/image/limousineMerge.png' }
    ]
};