import { Menu } from '@/utils/content';

const MenuCard = () => {
  return (
    <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {Menu.map((item, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src={item.image_link} alt={item.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-600">Rp {item.harga.toLocaleString('id-ID')}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuCard;
