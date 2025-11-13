import { Send } from 'lucide-react';
import { Wip } from '@/components';
import { formatByISOKoreanTime } from '@/lib/date';

const mockData = [
	{
		id: 1,
		title: 'skevv test 1',
		pageCount: 12,
		created_at: new Date().toISOString(),
	},
	{
		id: 2,
		title: 'skevv test 2',
		pageCount: 4,
		created_at: new Date().toISOString(),
	},
	{
		id: 3,
		title: 'skevv test 3',
		pageCount: 5,
		created_at: new Date().toISOString(),
	},
	{
		id: 4,
		title: 'skevv test 4',
		pageCount: 2,
		created_at: new Date().toISOString(),
	},
];

export default async function DocumentsPage() {
	return (
		<section className="p-3 bg-gray-50">
			<Wip
				message={
					"This page is going to being used as the page where check the temporarily saved ones and show the file works' list who sign up the service"
				}
				icon={<Send size={16} />}
			/>
			<div className="grid grid-rows-2 gap-3 mt-6 sm:grid-cols-5">
				<div className="row-span-auto sm:col-span-3">
					<h2 className="font-bold">Recent Works</h2>
					<ul className="flex flex-col gap-3 mt-3">
						{mockData.map(item => (
							<li key={item.id} className="flex justify-between items-center gap-2 p-3 bg-white rounded-lg">
								<div className="flex items-center gap-2">
									<span className="inline-block w-2 h-2 rounded-full bg-black" />
									<p className="py-1.5 px-3 bg-gray-200 font-medium rounded-md">{item.title}</p>
									<span className="text-bold">{item.pageCount}</span>
								</div>
								<span className="text-sm text-gray-600">{formatByISOKoreanTime(item.created_at)}</span>
							</li>
						))}
					</ul>
				</div>
				<div className="row-span-auto sm:col-span-2">
					<h2 className="font-bold">Temporarily Saved Files</h2>
					<ul className="flex flex-col gap-3 mt-3">
						{mockData.map(item => (
							<li key={item.id} className="flex justify-between items-center gap-2 p-3 bg-white rounded-lg">
								<div className="flex items-center gap-2">
									<span className="inline-block w-2 h-2 rounded-full bg-gradient-blue-100" />
									<p className="py-1.5 px-3 bg-gray-200 font-medium rounded-md">{item.title}</p>
									<span className="text-bold">{item.pageCount}</span>
								</div>
								<span className="text-sm text-gray-600">{formatByISOKoreanTime(item.created_at)}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
