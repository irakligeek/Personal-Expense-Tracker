// Basic section component with the paddings
export default function Section({ children, classes }) {
    const classNames = classes ? classes + ' py-8 px-8' : "py-8 px-8";
  return <section className={classNames}>{children}</section>;
}