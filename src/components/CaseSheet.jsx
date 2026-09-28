import { ArrowUpRight } from "@phosphor-icons/react";

/* One client project: the live site beside a short facts table. */
const CaseSheet = ({ project, eager = false }) => {
	const { stats = {} } = project;
	const facts = [
		["Scope", project.tags.join(", ")],
		["Delivered in", stats.duration],
		["Built with", stats.tech],
		["Delivered", project.delivered],
	].filter(([, v]) => v);

	return (
		<article className="card grid gap-6 p-3 md:grid-cols-12 md:items-center md:gap-10 md:p-4">
			<a
				href={project.link}
				target="_blank"
				rel="noopener noreferrer"
				className="group relative block md:col-span-7"
				aria-label={`Visit the ${project.title} website (opens in a new tab)`}
			>
				<div className="zoom overflow-hidden rounded-[14px]">
					<img
						src={project.image}
						alt={`${project.title} website`}
						width="1920"
						height="1028"
						loading={eager ? "eager" : "lazy"}
						className="block aspect-[16/10] w-full object-cover object-top"
					/>
				</div>
				{project.detail && (
					<div className="absolute -bottom-3 right-4 hidden w-[36%] overflow-hidden rounded-[10px] border-4 sm:block" style={{ boxShadow: "var(--shadow-card)", borderColor: "var(--paper)" }}>
						<img src={project.detail} alt={`${project.title} shop page`} width="1200" height="604" loading="lazy" className="block w-full" />
					</div>
				)}
			</a>

			<div className="px-3 pb-4 md:col-span-5 md:px-0 md:py-4 md:pr-4">
				<h2 className="text-2xl font-semibold tracking-[-0.025em] md:text-[1.75rem]" style={{ color: "var(--ink)" }}>
					{project.title}
				</h2>
				<p className="mt-3 leading-relaxed" style={{ color: "var(--ink-2)" }}>
					{project.description}
				</p>

				<table className="facts mt-6 text-[0.95rem]">
					<tbody>
						{facts.map(([label, value]) => (
							<tr key={label}>
								<th scope="row">{label}</th>
								<td className={label === "Delivered" ? "num font-semibold" : undefined} style={label === "Delivered" ? { color: "var(--azure-ink)" } : { color: "var(--ink)" }}>
									{value}
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm group mt-6">
					Visit the live site
					<span className="btn-disc" aria-hidden="true">
						<ArrowUpRight size={15} weight="bold" />
					</span>
					<span className="sr-only">(opens in a new tab)</span>
				</a>
			</div>
		</article>
	);
};

export default CaseSheet;
