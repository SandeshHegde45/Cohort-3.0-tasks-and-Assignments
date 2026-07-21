export default function ProductSkeleton() {
  return (
    <div className="bg-[#111] border border-white/8 rounded-3xl overflow-hidden">
      <div className="aspect-square skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-3 skeleton rounded-lg w-1/3" />
        <div className="h-4 skeleton rounded-lg w-full" />
        <div className="h-4 skeleton rounded-lg w-2/3" />
        <div className="h-3 skeleton rounded-lg w-1/4" />
        <div className="h-px bg-white/5 my-2" />
        <div className="flex justify-between items-center">
          <div className="h-5 skeleton rounded-lg w-16" />
          <div className="h-7 skeleton rounded-xl w-16" />
        </div>
      </div>
    </div>
  );
}
