interface ProjectPageProps {
  params: { projectId: string };
}

export default function ProjectPage({
  params: { projectId },
}: ProjectPageProps) {
  return <div>project page - {projectId}</div>;
}
