import { Mail, Phone, Github, Twitter } from "lucide-react"; // icons

function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F2E6EE] flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full text-center">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-[#00033D] mb-2">
          Contact the Developer
        </h1>
        <p className="text-gray-600 mb-6">
          I’d love to hear from you! Reach out via the details below.
        </p>

        {/* Contact Info */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-3">
            <Mail className="text-[#00033D]" />
            <a
              href="mailto:nkevin881@gmail.com"
              className="text-blue-600 hover:underline"
            >
              nkevin881@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-[#00033D]" />
            <span className="text-gray-800">+250 783 317 880</span>
          </div>
          <div className="flex items-center gap-3">
            <Github className="text-[#00033D]" />
            <a
              href="https://github.com/kevin-0703"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              NSHUTI Kevin | kevin-0703
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Twitter className="w-6 h-6" />
            <a
              href="https://x.com/nshutikevin11?s=21&t=A2Nft2Fn8gr5kkCZDqGfWA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500"
            >
              NSHUTI Kevin @NSHUTIKevin11
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold">NSHUTI Kevin</span>
          </p>
          <p>Full-Stack Developer | CineMate Project</p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
