import Link from "next/link";
import React, { useContext, useEffect, useRef } from "react";

import styles from "@/styles/navigation/primary.module.scss";
import Icon from "../icon";
import { NavigationContext } from "@/context/navigation";
import * as navigation from "@/utils/navigation";
import { IPage, IPageSection } from "@/@types/generated/contentful";
import ScrollLink from "./scrollLink";

export type NavigationProps = {
	ariaLabel?: string;
	className?: string;
	items: {sections: IPageSection[], pages: IPage[] };
	role?: string;
};

export default function Navigation( props: NavigationProps ) {
	const { sections, pages } = props.items;
	const navigationContext = useContext(NavigationContext);

	useEffect(() => {
		const backToTop = document.getElementById('backToTop');

		if (backToTop)
			backToTop.style.opacity = "0";

		function handleScroll(event: Event) {
			if (backToTop)
				backToTop.style.opacity = (window.scrollY > 100)? "1" : "0";

			navigation.handleScroll(event, navigationContext.clicked, navigationContext.menuItems);
		}

		if (navigationContext.menuItems)
			navigationContext.menuItems.current = document.body.querySelectorAll('nav[id=main] .pure-menu-item');

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [navigationContext.menuItems, navigationContext.clicked]);

	function handleClick(event: React.MouseEvent) {
		if (navigationContext.callback)
			navigation.handleClick(event, navigationContext.menuItems, navigationContext.callback);
	}

	return <nav className={props.className} id="main" role="navigation" aria-label={props.ariaLabel || "Primary"}>
		<ul className="pure-menu-list">
			<li className="pure-menu-separator"></li>
			{sections && sections.map(section => {
				const href = `#${section.fields.slug}`;

				return <li key={section.sys.id} className="pure-menu-item">
					<ScrollLink callback={handleClick} className={`pure-menu-link ${styles.link}`} href={href}>
						<span className={styles.text}>
							<Icon icon={section.fields.icon.fields.name} />
							{section.fields.headline}
						</span>
					</ScrollLink>
				</li>
			})}
			{pages.length > 0 && <>
				<li className="pure-menu-separator"></li>
				{pages.map(page => {
					return <li key={page.sys.id} className="pure-menu-item">
						<Link className={`pure-menu-link ${styles.link}`} href={page.fields.slug}>
							<span className={styles.text}>
								<Icon icon={page.fields.icon.fields.name} />
								{page.fields.title}
							</span>
						</Link>
					</li>;
				})}
			</>}
		</ul>
	</nav>
}
