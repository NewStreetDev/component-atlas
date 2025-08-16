"use client";

import { useCountries } from "./useCountries";
import {
  Autocomplete,
  TextField,
  TextFieldProps,
  InputAdornment,
} from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";

//INTERFACE
import { Country } from "./countries";

interface PhoneInputProps extends Omit<TextFieldProps, "value" | "onChange"> {
  label?: string;
  value: string;
  onChange: (newValue: string) => void;
  error?: boolean;
  helperText?: string;
}

export default function PhoneInput({
  label = "Enter phone number",
  value,
  onChange,
  error,
  helperText,
  ...textFieldProps
}: Readonly<PhoneInputProps>) {
  const { countries } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const lastSpaceIndex = value.lastIndexOf(" ");
  const countryCode = value.slice(0, lastSpaceIndex).trim() || "";
  const phoneNumber = value.slice(lastSpaceIndex).trim() || "";

  const handleChangePhone = (newPhone: string) => {
    onChange(`${countryCode.trim()} ${newPhone.trim()}`);
  };

  const handleChangeCountry = (newCountry: Country | null) => {
    setSelectedCountry(newCountry);
    onChange(`${newCountry?.countryCallingCode} `);
  };

  useEffect(() => {
    if (countryCode && !selectedCountry) {
      const country = countries.find(
        (country) => country.countryCallingCode === countryCode
      );
      setSelectedCountry(country || null);
    }
  }, [value]);

  return (
    <div className="flex items-start w-full ">
      <Autocomplete
        className="w-2/4"
        options={countries}
        getOptionLabel={(option) => option.countryCallingCode}
        value={selectedCountry}
        onChange={(_, newValue) => {
          handleChangeCountry(newValue);
          setSelectedCountry(newValue);
        }}
        isOptionEqualToValue={(option, value) => option.name === value?.name}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <li
              key={option.name + key}
              {...optionProps}
              className={` ${option.name === selectedCountry?.name && "bg-gray-100"} flex items-center space-x-2 p-2 hover:bg-gray-200 transition-all duration-200 cursor-pointer ease-in-out`}
            >
              <Image
                loading="lazy"
                src={option.flags.svg}
                alt={`${option.name} flag`}
                width={24}
                height={16}
                className="rounded-sm"
              />
              <span className="text-gray-500">{option.countryCallingCode}</span>
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            value={countryCode}
            label="Code"
            variant="filled"
            sx={{
              "& .MuiInputBase-root": {
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
              },
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: selectedCountry && (
                <InputAdornment position="start" className="m-0! mr-2!">
                  <Image
                    loading="lazy"
                    src={selectedCountry.flags.svg}
                    alt={`${selectedCountry.name} flag`}
                    width={16}
                    height={8}
                  />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      {/* Phone Number Input */}
      <TextField
        {...textFieldProps}
        disabled={!selectedCountry}
        label="Phone Number"
        type="tel"
        variant="filled"
        placeholder={label}
        value={phoneNumber}
        onChange={(e) => handleChangePhone(e.target.value)}
        fullWidth
        error={error}
        helperText={helperText}
        sx={{
          "& .MuiInputBase-root": {
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
          },
        }}
      />
    </div>
  );
}
