interface Props {
  message?: string;
}

export function ErrorState({ message = "مشکلی پیش آمد. لطفاً دوباره تلاش کن." }: Props) {
  return (
    <div className="mx-4 rounded-card bg-tg-secondary-bg p-4 text-center text-sm text-tg-hint">
      {message}
    </div>
  );
}
