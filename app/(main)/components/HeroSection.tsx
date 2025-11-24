"use client";

export default function HeroSection() {
  return (
    <section className="relative bg-linear-to-b from-primary/5 to-background pt-20 md:pt-32 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Tìm Công Việc <span className="text-primary">Tuyệt Vời</span> Tại
            GOAT
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Khám phá hàng ngàn cơ hội việc làm từ các công ty hàng đầu. Nâng cao
            sự nghiệp của bạn cùng GOAT.
          </p>
        </div>
      </div>
    </section>
  );
}
