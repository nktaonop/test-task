import Link from 'next/link';
import './header.scss';

export default function Header() {
  return (
    <div className="header-links">
      <Link className="link" href="/shop">
        Shop
      </Link>
      <div className="divider"></div>
      <Link className="link" href="/shoppingCart">
        Shopping Cart
      </Link>
    </div>
  );
}
