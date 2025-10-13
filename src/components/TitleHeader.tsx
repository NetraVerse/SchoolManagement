import { JSX } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
type Props = {
  title: string;
  button?: JSX.Element;
  importButton?: JSX.Element;
  exportElement?: JSX.Element;
};

const TitleHeader = ({ title, button, importButton, exportElement }: Props) => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  return (
    <>
      <header className="mb-4 py-6 px-6 font-bold dark:bg-[#202024] dark:text-white bg-white text-lg flex justify-between border-b border-l border-r border-[#ECECEC]">
        <h1 className="">
          {`${title}`}
          <div className="text-xs font-bold text-teal-500">
            {pathParts.map((part, index) => {
              const partialPath = "/" + pathParts.slice(0, index + 1).join("/");

              if (index === pathParts.length - 2) {
                return null;
              }

              const uuidRegex =
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
              if (uuidRegex.test(part)) {
                return null;
              }

              return (
                <Link href={partialPath} key={index + 1}>
                  <span>/{`${part}`}</span>
                </Link>
              );
            })}
          </div>
        </h1>

        <div className="flex justify-end gap-1 ">
          <div className="flex items-center">{exportElement}</div>
          <div className="flex items-center">{importButton}</div>
          <div className="flex items-center">{button}</div>
        </div>
      </header>
    </>
  );
};
export default TitleHeader;
