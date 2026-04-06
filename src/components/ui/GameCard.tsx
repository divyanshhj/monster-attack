export const GameCard = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => (
  <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 mt-10">
    <h1 className="text-3xl font-black text-center mb-10 text-gray-800 tracking-tighter uppercase italic">
      {title}
    </h1>
    {children}
  </div>
);
