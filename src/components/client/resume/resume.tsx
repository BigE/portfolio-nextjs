import styles from "@/styles/resume.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

import { options } from "../richtext";

export type ResumeProps = {
	title: string;
	headerLeft?: Document;
	headerRight?: Document;
	objective: string;
	skills: Document;
	professionalExperience?: React.ReactNode;
	personalExperience?: React.ReactNode;
};

export default function Resume( { title, headerLeft, headerRight, objective, skills, professionalExperience, personalExperience, ...props }: ResumeProps & JSX.IntrinsicElements["section"] ) {
	props.className = [styles.resume, props.className].join(' ').trim();

	return <section {...props}>
		<header className={styles.header}>
			<h2 className="centered">{title}</h2>
			{headerLeft && <div className={styles.left}>{documentToReactComponents(headerLeft, options)}</div>}
			{headerRight && <div className={`${styles.right} right`}>{documentToReactComponents(headerRight, options)}</div>}
			<div className="clear"></div>
		</header>
		<section id="objective" className={`${styles.section} ${styles.objective}`}>
			<div className={styles.content}>{objective}</div>
		</section>
		<section id="skills" className={`${styles.section} ${styles.skills}`}>
			{documentToReactComponents(skills, options)}
		</section>
		{professionalExperience &&
			<section className={styles.section}>
				<h2 className={styles.header}>Professional Experience</h2>
				<section className={styles.content}>{professionalExperience}</section>
			</section>
		}
		{personalExperience &&
			<section className={styles.section}>
				<h2 className={styles.header}>Personal Experience</h2>
				<section className={styles.content}>{personalExperience}</section>
			</section>
		}
	</section>
}