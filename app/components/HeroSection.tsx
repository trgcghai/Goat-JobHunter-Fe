import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary/5 to-background py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Tìm Công Việc <span className="text-primary">Tuyệt Vời</span> Tại
            GOAT
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
            Khám phá hàng ngàn cơ hội việc làm từ các công ty hàng đầu. Nâng cao
            sự nghiệp của bạn cùng GOAT.
          </p>

          <div className="flex flex-col md:flex-row gap-3 items-center justify-center mb-12">
            <Input
              type="text"
              placeholder="Vị trí hoặc công việc..."
              className="flex-1 md:max-w-xs rounded-xl"
            />
            <Input
              type="text"
              placeholder="Thành phố hoặc địa chỉ..."
              className="flex-1 md:max-w-xs rounded-xl"
            />
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 rounded-xl">
              Tìm Kiếm
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
