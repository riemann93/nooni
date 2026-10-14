/**
 * Statement: the one sentence that sells Dots, said big and quiet.
 * It is reason 1 from the Instagram posts ("Det er min, den her!"),
 * set like a pull quote with plenty of air around it.
 */

export default function Statement() {
  return (
    <section className="bg-nooni-bg py-20 md:py-40" data-screen-label="02 Statement">
      <div className="mx-auto max-w-[980px] px-6 text-center">
        <h2
          className="font-editorial leading-[1.12] tracking-[-0.02em] text-nooni-ink-soft/60"
          style={{ fontSize: "clamp(30px, 4.6vw, 64px)" }}
        >
          Ti ens flyverdragter i garderoben.{" "}
          <span className="text-nooni-ink">Dit barn finder selv sin egen.</span>
        </h2>
        <p className="mt-6 italic text-nooni-headline" style={{ fontSize: "clamp(22px, 2.4vw, 32px)" }}>
          „Det er min, den her!“
        </p>
      </div>
    </section>
  );
}
