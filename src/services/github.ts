export interface Contributor {
  fullName: string;
  avatarLink: string;
}

export interface Repository {
  name: string;
  description: string;
  ownerId: string;
  stars: number;
  contributorsLink: string;
}

export interface Params {
  sort: string;
  order: "asc" | "desc";
  page: number;
  per_page: number;
  [key: string]: string | number;
}

const defaultParams: Params = {
  sort: "name",
  order: "asc",
  page: 1,
  per_page: 20,
};

const transformRepo = (item: any = {}): Repository => ({
  name: item.name,
  description: item.description,
  stars: item.stargazers_count,
  ownerId: item.owner.login,
  contributorsLink: item.contributors_url,
});

const transformContributor = (user: any = {}): Contributor => ({
  fullName: user.name,
  avatarLink: user.avatar_url,
});

const fetchJson = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export const getRepos = async (searchParams?: Params) => {
  const githubRepoApi =
    "https://api.github.com/search/repositories?q=created:%3E2021-01-07+in:name,full_name,stars";
  const params = {
    ...defaultParams,
    ...searchParams,
  } as Record<string, string>;
  const query = new URLSearchParams(params).toString();
  const items: unknown[] =
    (await fetchJson(`${githubRepoApi}${query}`)).items || [];
  return items.map(transformRepo);
};

export const getContributors = async (ownerId: string, repoName: string) => {
  const url = `https://api.github.com/repos/${ownerId}/${repoName}/contributors`;
  try {
    const contributors: unknown[] = (await fetchJson(url)) || [];
    const promises = contributors.map(async (c: any) => {
      const contributor = await fetchJson(c.url);
      return transformContributor(contributor);
    });

    return Promise.all(promises);
  } catch (err) {
    console.error(new Error(err as string));
    return Promise.resolve([
      {
        fullName: "Breakdowns Slam-mirrorbot",
        avatarLink: "https://avatars.githubusercontent.com/u/71178188?v=4",
      },
      {
        fullName: "ChoiceCoin",
        avatarLink: "https://avatars.githubusercontent.com/u/87402354?v=4",
      },
    ] as Contributor[]);
  }
};
