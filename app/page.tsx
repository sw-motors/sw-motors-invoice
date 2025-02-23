'use client';

import React from "react";
import { useState, useEffect } from "react";
// items-center 
import { title, subtitle } from "@/components/primitives";
import { Image } from "@heroui/image";
import { CheckboxGroup, Checkbox } from "@heroui/checkbox";

import {
  CarPriceGasoline,
  CarPriceDiesel,
  CarPriceHybrid,
  CarOptionsList
} from './caroption';

import { LoopSelect, PackageSelect, SW9Extra, LimousineExtra } from './swoption';
type SelectedValues = string[];

export default function Home() {
  const [carEngine, setCarEngine] = useState<string[]>([]);
  const [carGrade, setCarGrade] = useState<string[]>([]);
  const [carColor, setCarColor] = useState<string[]>([]);
  const [carSheet, setCarSheet] = useState<string[]>([]);
  const [carPrice, setCarPrice] = useState<number>(0);
  const [optionPrice, setOptionPrice] = useState<number>(0);
  const [swOption, setSWOption] = useState<string[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectOption, setSelectOption] = useState<string[]>([]);
  const [isTransportSelected, setIsTransportSelected] = useState(false);
  const [extraPrice, setExtraPrice] = useState<number>(0);
  
  const resetSelections = () => {
    setOptionPrice(0);
    setSelectOption([]);
    setSWOption([]);
    setSelectedPackage([]);
  };

  const EngineChange = (selectedValues: SelectedValues) => {
    setCarEngine(selectedValues.slice(0, 1));
    resetSelections();
  };

  const GradeChange = (selectedValues: SelectedValues) => {
    if (carEngine.length === 0) {
    } else {
      setCarGrade(selectedValues.slice(0, 1));
      resetSelections();
    }
  };

  const handleOptionChange = (selectedValues: SelectedValues) => {
    setSelectOption(selectedValues);

    let totalOptionPrice = 0;
    selectedValues.forEach((option) => {
      const optItem = CarOptionsList[carGrade[0] as keyof typeof CarOptionsList]?.find(
        (item) => item.value === option
      );
      if (optItem) {
        totalOptionPrice += optItem.price;
      }
    });
    setOptionPrice(totalOptionPrice);
  };

  const handleSWOptionChange = (selectedValues: SelectedValues) => {
    setSWOption(selectedValues.slice(0, 1));
    setSelectedPackage([]);
  };

  const handleExtraOptionChange = (selectedValues: SelectedValues) => {
    setSelectedOptions(selectedValues);

    let total = 0;
    selectedValues.forEach((option) => {
      const sw9Item = SW9Extra.find((item) => item.value === option);
      const limoItem = LimousineExtra.find((item) => item.value === option);
      if (sw9Item) total += sw9Item.price;
      if (limoItem) total += limoItem.price;
    });
    setExtraPrice(total);
  };

  useEffect(() => {
    let totalPrice = 0;
    // 1
    if (carEngine.length > 0 && carGrade.length > 0) {
      const engine = carEngine[0];
      const priceList =
        engine === 'gasoline'
          ? CarPriceGasoline
          : engine === 'diesel'
          ? CarPriceDiesel
          : engine === 'hybrid'
          ? CarPriceHybrid
          : [];
      const selectedGrade = priceList.find((item) => item.name === carGrade[0]);
      totalPrice += selectedGrade?.price || 0;

      // 2
      if (carColor.includes('color1')) {
        totalPrice += 80000;
      }
    }

    selectOption.forEach((option) => {
      const optItem = CarOptionsList[carGrade[0] as keyof typeof CarOptionsList]?.find(
        (item) => item.value === option
      );
      if (optItem) totalPrice += optItem.price;
    });

    swOption.forEach((option) => {
      const loopItem = LoopSelect.find((item) => item.value === option);
      if (loopItem) totalPrice += loopItem.price;
    });

    selectedPackage.forEach((pkg) => {
      const packageList = PackageSelect[swOption[0] as keyof typeof PackageSelect] || [];
      const packageItem = packageList.find((item) => item.value === pkg);
      if (packageItem) totalPrice += packageItem.price;
    });

    if (isTransportSelected) {
      totalPrice += 110000; // 탁송료 추가
    }

    totalPrice += extraPrice;

    setCarPrice(totalPrice);
  }, [carEngine, carGrade, carColor, selectOption, swOption, selectedPackage, isTransportSelected, extraPrice]);

  function CarEngine() {
    return (
      <>
      <span className={subtitle({ class: "font-bold" })}>
        엔진 선택
      </span>
      <CheckboxGroup
        label="엔진을 선택해주세요."
        orientation="horizontal"
        value={carEngine}
        onChange={EngineChange}
      >
        <Checkbox value="gasoline">3.5 가솔린</Checkbox>
        <Checkbox value="diesel">2.2 디젤</Checkbox>
        <Checkbox value="hybrid">1.6 하이브리드</Checkbox>
      </CheckboxGroup>
      </>
    )
  }
  function CarGrade() {
    return (
      <>
      <span className={subtitle({ class: "font-bold" })}>
        차량 등급
      </span>
      <CheckboxGroup
        label="차량 등급을 선택해주세요."
        orientation="horizontal"
        value={carGrade}
        onChange={GradeChange}
      >
        <Checkbox value="Prestige">프레스티지</Checkbox>
        <Checkbox value="Noble">노블레스</Checkbox>
        <Checkbox value="Signature">시그니처</Checkbox>
        <Checkbox value="Gravity">그래비티</Checkbox>
      </CheckboxGroup>
      </>
    )
  }
  function CarColor() {
    return (
      <>
        <span className={subtitle({ class: "font-bold" })}>
          차량 색상
        </span>
        <CheckboxGroup
          label="차량 등급마다 선택할 수 있는 색상에 차이가 있어요."
          orientation="horizontal"
          value={carColor}
          onChange={(selectedValues: any[]) => setCarColor(selectedValues.slice(0, 1))}
        >
          <Checkbox value="color1">스노우 화이트 펄(SWP) (+80,000)</Checkbox>
          {!carGrade.includes('Gravity') && (
            <Checkbox value="color2">아이보리 실버(ISG)</Checkbox>
          )}
          <Checkbox value="color3">오로라 블랙 펄(ABP)</Checkbox>
          {!carGrade.includes('Gravity') && (
            <Checkbox value="color4">판테라 메탈(P2M)</Checkbox>
          )}
          {!carGrade.includes('Prestige') &&
            !carGrade.includes('Noble') &&
            !carGrade.includes('Signature') && (
              <Checkbox value="color5">세라믹 실버(C4S)</Checkbox>
            )}
        </CheckboxGroup>
      </>
    );
  }
  function CarSheet() {
    return (
      <>
        <span className={subtitle({ class: "font-bold" })}>
          차량 시트 색상
        </span>
        <CheckboxGroup
          label="차량 엔진마다 선택할 수 있는 색상에 차이가 있어요."
          orientation="horizontal"
          value={carSheet}
          onChange={(selectedValues: any[]) => setCarSheet(selectedValues.slice(0, 1))}
        >
          <Checkbox value="sheet1">토프</Checkbox>
          {!carGrade.includes('Prestige') && (
            <>
              <Checkbox value="sheet2">코튼 베이지</Checkbox>
              {!carGrade.includes('Noble') &&
                !carEngine.includes('gasoline') &&
                !carEngine.includes('diesel') &&
                !carEngine.includes('Signature') && (
                  <Checkbox value="sheet3">네이비 그레이</Checkbox>
                )}
            </>
          )}
        </CheckboxGroup>
      </>
    );
  }
  function CarOptions() {
    const gradeKey = carGrade[0] as keyof typeof CarOptionsList;
    const options = CarOptionsList[gradeKey] || [];
    return (
      <>
        <span className={subtitle({ class: "font-bold" })}>
          차량 옵션 선택
        </span>
        <CheckboxGroup
          label="차량 옵션을 선택해주세요."
          orientation="horizontal"
          value={selectOption}
          onChange={handleOptionChange}
        >
          {options.map((opt) => (
            <Checkbox key={opt.value} value={opt.value}>
              {opt.name} (+{opt.price.toLocaleString()} 원)
            </Checkbox>
          ))}
        </CheckboxGroup>
      </>
    );
  }

  function SWOptions() {
    return (
      <>
        <span className={subtitle({ class: "font-bold" })}>
          서원모터스 옵션 선택
        </span>
        <CheckboxGroup
          label="서원모터스 제공 옵션을 선택해주세요."
          orientation="horizontal"
          value={swOption}
          onChange={handleSWOptionChange}
        >
          {LoopSelect.map((option) => (
            <Checkbox key={option.value} value={option.value}>
              {option.name} (+{option.price.toLocaleString()} 원)
            </Checkbox>
          ))}
        </CheckboxGroup>
        {swOption.length > 0 && <PackageOptions />}
      </>
    );
  }
  function ExtraOptions() {
    return (
      <>
        <br />
        <span className={subtitle({ class: "font-bold" })}>서원모터스 추가 옵션 선택</span>
  
        {swOption.includes("SW9_Low") && (
          <CheckboxGroup 
            label="SW9 추가 옵션을 선택해주세요."
            orientation="horizontal"
            value={selectedOptions} 
            onChange={handleExtraOptionChange}
          >
            {SW9Extra.map((option) => (
              <Checkbox key={option.value} value={option.value}>
                {option.name} (+{option.price.toLocaleString()} 원)
              </Checkbox>
            ))}
          </CheckboxGroup>
        )}

        {(swOption.includes("SignatureMolding")) && (
          <CheckboxGroup
            orientation="horizontal"
            value={selectedOptions} 
            onChange={handleExtraOptionChange}
          >
            {LimousineExtra.map((option) => (
              <Checkbox key={option.value} value={option.value}>
                {option.name} (+{option.price.toLocaleString()} 원)
              </Checkbox>
            ))}
          </CheckboxGroup>
        )}

        {(swOption.includes("StandardEdge")) && (
          <CheckboxGroup
            orientation="horizontal"
            value={selectedOptions} 
            onChange={handleExtraOptionChange}
          >
            {LimousineExtra.map((option) => (
              <Checkbox key={option.value} value={option.value}>
                {option.name} (+{option.price.toLocaleString()} 원)
              </Checkbox>
            ))}
          </CheckboxGroup>
        )}
      </>
    );
  }
  
  function PackageOptions() {
    const swPackageImages: { [key: string]: string } = {
      Family: "/images/family.png",
      Daily: "/images/daily.png",
      LimousineMerge: "/images/limousineMerge.png",
      LimousineColor: "/images/limousineColor.png",
      Semi: "/images/semi.png",
      Premium6: "/images/premium6.png",
      TheH: "/images/theh.png",
      ColorCarnival: "/images/colorCarnival.png"
    };
    const isGasolineAndValidGrade =
      carEngine.includes('gasoline') &&
      ['Noble', 'Signature', 'Gravity'].some((grade) => carGrade.includes(grade));
  
    const packageList =
      swOption.length > 0 && swOption[0]
        ? PackageSelect[swOption[0] as keyof typeof PackageSelect] || []
        : [];
  
    const filteredPackages = packageList.filter((pkg: { value: string }) => {
      if (pkg.value === 'TheH') {
        return (
          swOption.includes('SignatureMolding') &&
          isGasolineAndValidGrade
        );
      }
      return true;
    });
    return (
      <>
        <br />
        <span className={subtitle({ class: "font-bold" })}>
          패키지 옵션 선택
        </span>
        <CheckboxGroup
          label="패키지를 선택해주세요."
          orientation="horizontal"
          value={selectedPackage}
          onChange={(selectedValues: any[]) =>
            setSelectedPackage(selectedValues.slice(0, 1))
          } // 단일 선택
        >
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.value}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '10px',
              }}
            >
              <Checkbox value={pkg.value}>
                {pkg.name} (+{pkg.price.toLocaleString()} 원)
              </Checkbox>
            </div>
          ))}
        </CheckboxGroup>
        {selectedPackage.length > 0 && (
        <div className="mt-4 flex justify-center">
          <Image
            src={swPackageImages[selectedPackage[0]] || "/images/default.jpg"}
            alt={selectedPackage[0]}
            width={650}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      )}
      {swOption.length > 0 && <ExtraOptions />}
      </>
    );}

  function Transport() {
    const handleTransportChange = () => {
      const fee = 110000;
      if (!isTransportSelected) {
        setCarPrice((prevPrice) => prevPrice + fee); // 체크하면 금액 추가
      } else {
        setCarPrice((prevPrice) => prevPrice - fee); // 체크 해제하면 금액 감소
      }
      setIsTransportSelected(!isTransportSelected); // 상태 토글
    };
  
    return (
      <>
        <span className={subtitle({ class: "font-bold" })}>
          탁송료 (필수 항목)
        </span>
        <Checkbox
          isSelected={isTransportSelected}
          onChange={handleTransportChange}
        >
          소하리 ▷ 서울 탁송료 (+110,000)
        </Checkbox>
      </>
    );
  }
  return (
    <>
      <nav className="shadow-md">
      <div className="flex justify-center items-center gap-2">
        <Image
          src="/images/sw-logo.png"
          width={100}
          height={36}
          className="mr-1"
        />
      <span className={title({ class: "leading-tight" })}>서원모터스</span>
    </div>
    </nav>
    <br />
    <div className="flex justify-center items-center mt-0">
        <div className={subtitle({ class: "text-center mt-4" })}>
          서원모터스는 모든 차량을 9인승 기준으로 작업하고 있습니다.
        </div>
    </div>
    <section className="flex flex-col justify-center gap-4 py-8 md:py-10">
      <CarEngine />
      <br />
      <CarGrade />
      <br />
      <CarColor />
      <br />
      <CarSheet />
      <br />
      <CarOptions />
      <br />
      <SWOptions />
      <br />
      <Transport />
      <br />
      <div className={subtitle({ class: "font-bold" })}>
        총 금액 : {carPrice.toLocaleString()} 원
      </div>
    </section>
  </>
  );
}