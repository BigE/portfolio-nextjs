"use client";

import { Options as OptionsType, documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document, INLINES } from "@contentful/rich-text-types";

import Icon from "./icon";
import React from "react";

export type RichTextProps = {
	document: Document;
	options?: OptionsType;
};

export const Options: OptionsType = {
	renderNode: {
		[INLINES.HYPERLINK]: (node, children) => {
			if (/^(https?:)?\/\//.test(node.data.uri))
				return <a href={node.data.uri}>{children}<Icon icon="FaExternalLinkAlt" link /></a>;
			return <a href={node.data.uri}>{children}</a>},
	},
	renderText: text => text.split("\n").flatMap((text, i) => [i > 0 && <br />, text]),
};

export default function RichText( { document, options = Options }: RichTextProps ) {
	return <>{documentToReactComponents(document, options)}</>
}
