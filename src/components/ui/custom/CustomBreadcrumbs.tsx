import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	// BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { SlashIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

interface Breadcrumb {
	label: string;
	to: string;
}

interface Props {
	currentPage: string;
	breadcrumbs?: Breadcrumb[];
}

export function CustomBreadcrumbs({ currentPage, breadcrumbs }: Props) {
	return (
		<Breadcrumb className="my-5">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link to="/">Inicio</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>

				{breadcrumbs?.map((crumb, index) => (
					// <div className="flex items-center">
					<React.Fragment key={`${crumb.to}-${index}`}>
						<BreadcrumbSeparator>
							<SlashIcon />
						</BreadcrumbSeparator>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link to={crumb.to}>{crumb.label}</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
					</React.Fragment>
					// </div>
				))}

				<BreadcrumbSeparator>
					<SlashIcon />
				</BreadcrumbSeparator>

				<BreadcrumbItem>
					<BreadcrumbLink className="text-black">{currentPage}</BreadcrumbLink>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}
