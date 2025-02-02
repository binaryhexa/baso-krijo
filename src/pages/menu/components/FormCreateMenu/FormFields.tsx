import React from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { MenuProps } from "@/utils/interfaces";
import CurrencyInput from "react-currency-input-field";

interface FormFieldsProps {
  register: UseFormRegister<MenuProps>;
  setValue: UseFormSetValue<MenuProps>;
}

const FormFields: React.FC<FormFieldsProps> = ({ register, setValue }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Nama Menu</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full border-[1.5px] border-gray-500 px-3 py-2 rounded-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Harga</label>
          <CurrencyInput
            className="w-full border-[1.5px] border-gray-500 px-3 py-2 rounded-full"
            prefix="Rp "
            decimalSeparator=","
            groupSeparator="."
            placeholder="Rp 0"
            allowNegativeValue={false}
            onValueChange={(value) => setValue("harga", parseInt(value || "0"))}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Jumlah Stok</label>
          <input
            type="number"
            {...register("stok", { required: true })}
            className="w-full border-[1.5px] border-gray-500 px-3 py-2 rounded-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Kategori</label>
          <select
            {...register("category", { required: true })}
            className="w-full border-[1.5px] border-gray-500 px-3 py-2 rounded-full"
          >
            <option value="">Pilih Kategori</option>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
            <option value="Toping">Toping</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Unggah Gambar</label>
        <input
          type="file"
          {...register("image", { required: true })}
          className="w-full border-[1.5px] border-gray-500 px-3 py-2 rounded-full"
          accept="image/*"
        />
      </div>
    </>
  );
};

export default FormFields;
